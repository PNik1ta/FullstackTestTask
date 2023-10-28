import { LoaderProps } from "./Loader.props";
import styles from './Loader.module.scss';

export const Loader = ({...props}: LoaderProps): JSX.Element => {
    return (
		<div {...props} className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
    );
};