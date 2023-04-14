import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({children, variant = 'info'}) => {
    return ( <Alert variant={variant}> {children} </Alert>
    );
};

Message.defaultProps = {
    variant: 'info',
}
export default Message;