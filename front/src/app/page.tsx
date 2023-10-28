"use client";

import styles from './page.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserDto } from '../../core/dto/create-user.dto';
import UserService from '../../services/user.service';
import axios, { AxiosResponse, CancelToken } from 'axios';
import { BaseResponse } from '../../core/classes/base-response';
import { IUser } from '../../core/interfaces/user.interface';
import { formatPhoneNumber } from '../../core/utils/format-phone-number';
import { Loader } from '../../сomponents/loader/Loader';

let cancelTokenSource = axios.CancelToken.source();

export default function Home() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ email: '' });
  const [phone, setPhone] = useState('');
  const [phoneFind, setPhoneFind] = useState('');
  const [isRequestSent, setIsRequestSent] = useState(false);

  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const {
    register: registerFind,
    formState: {
      errors: errorsFind
    },
    handleSubmit: handleSubmitFind
  } = useForm({
    mode: 'onBlur'
  });

  const findUsersByEmailAndPhone = (data: any): void => {
    if (isRequestSent) {     
      cancelTokenSource.cancel('Operation canceled by the user.');
      setIsLoading(false);
      setIsRequestSent(false);
      alert('Previous request was sent. Canceling...');
      setUser({ email: ''});
      return;

    }    
    setIsRequestSent(true);
    const newCancelTokenSource = axios.CancelToken.source();
    cancelTokenSource = newCancelTokenSource;

    setIsLoading(true);
    const correctPhone = data.phone.replace(/-/g, '');
    UserService.getUserByEmailAndPhone(data.email, correctPhone, cancelTokenSource)
      .then((res: AxiosResponse<BaseResponse<IUser>>) => {
        if (!res.data.data) {
          setUser({ email: '' });
          alert(res.data.message);
        } else {
          setUser(res.data.data);
        }
        
        setIsLoading(false);
        setIsRequestSent(false);
      })
      .catch((error) => {
        setIsRequestSent(false);
      });
  }

  const addUser = (data: any): void => {
    setIsLoading(true);
    const correctPhone = data.phone.replace(/-/g, '');
    const dto: CreateUserDto = new CreateUserDto(data.email, correctPhone);
    UserService.createUser(dto).then((res: AxiosResponse<BaseResponse<IUser>>) => {
      setIsLoading(false);
      alert(`User created: ${res.data.data?.email}, ${res.data.data?.phone}`);
    });
  }

  const handlePhoneChange = (event: any) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setPhone(formattedValue)
  }

  const handlePhoneFindChange = (event: any) => {
    const formattedValue = formatPhoneNumber(event.target.value);
    setPhoneFind(formattedValue);
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(addUser)}>
        <div className={styles['form__field']}>
          <input
            {...register('email', {
              required: "Email can't be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            className={styles['form__input']}
            placeholder='Email'
          />
          {errors.email && <span><>{errors.email.message}</></span>}
        </div>

        <div className={styles['form__field']}>
          <input
            {...register('phone', {
              required: "Number can't be empty",
              pattern: {
                value: /^\d{2}-\d{2}-\d{2}$/,
                message: "Invalid phone number format, please use XX-XX-XX format"
              }
            })}
            type="text"
            onChange={handlePhoneChange}
            className={styles['form__input']}
            placeholder='Phone number'
            value={phone}
          />
          {errors.phone && <span><>{errors.phone.message}</></span>}
        </div>
        <input type="submit" className={styles['form__submit']} value='Add new User' />
      </form>

      <hr />

      <form className={styles.form} onSubmit={handleSubmitFind(findUsersByEmailAndPhone)}>
        <div className={styles['form__field']}>
          <input
            {...registerFind('email', {
              required: "Email can't be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            className={styles['form__input']}
            placeholder='Email'
          />
          {errorsFind.email && <span><>{errorsFind.email.message}</></span>}
        </div>

        <div className={styles['form__field']}>
          <input
            {...registerFind('phone', {
              required: "Number can't be empty",
              pattern: {
                value: /^\d{2}-\d{2}-\d{2}$/,
                message: "Invalid phone number format, please use XX-XX-XX format"
              }
            })}
            type="text"
            onChange={handlePhoneFindChange}
            value={phoneFind}
            className={styles['form__input']}
            placeholder='Phone number'
          />
          {errorsFind.phone && <span><>{errorsFind.phone.message}</></span>}
        </div>
        <input type="submit" className={styles['form__submit']} value='Find user by email and phone' />
      </form>


      {
        isLoading ? <Loader></Loader> : (
          user.email !== '' ? <div className={styles.user}>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div> : <></>
        )
      }


    </main>
  )
};
