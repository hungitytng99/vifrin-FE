import './ErrorMessage.scss'
import PropTypes from 'prop-types';

ErrorMessage.protoTypes = {
    name: PropTypes.string,
    errors: PropTypes.object,
    touched: PropTypes.object,
    hasTouched: PropTypes.bool,

}
ErrorMessage.defaultProps = {
    name: "",
    errors: {},
    touched: {},
    hasTouched: true,
}
function ErrorMessage(props){
    const { errors, touched, name, hasTouched } = props;
    const isShowError = errors[name] &&( hasTouched?touched[name]:true);
    return (
        <div className="error-message">
            {isShowError? errors[name] : ""}
        </div>
    )
}
export default ErrorMessage;