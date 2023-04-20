import validator from 'validator';

const REQUIRED_FIELDS_NOT_FILLED_MSG = 'Required fields are not filled';
const INVALID_HOST_NAME_MSG = 'HostName contains invalid characters';
const INVALID_EMAIL_MSG = 'Email Id not valid';
const INVALID_PHONE_NUMBER_MSG = 'Phone Number is not valid';
const INVALID_DATE_RANGE_MSG = 'Starting date must be smaller than ending date';

export default class Validation {
    valid = false;
    errors = [];

    constructor(document) {
        try {
            if (
                document.HostName !== '' &&
                document.EventName !== '' &&
                document.HostEmail !== '' &&
                document.HostPhone !== '' &&
                document.StartDate !== '' &&
                document.EndDate !== '' &&
                document.TotalTicket > 0
            ) {
                if (validator.isAlpha(document.HostName)) {
                    if (validator.isEmail(document.HostEmail)) {
                        const phoneRegex = /^[6-9]\d{9}$/gi;
                        if (phoneRegex.test(document.HostPhone)) {
                            if (
                                new Date(document.StartDate.replace(/-/g, '/')) <
                                new Date(document.EndDate.replace(/-/g, '/'))
                            ){
                                this.valid = true;
                            } else {
                                this.errors.push(INVALID_DATE_RANGE_MSG);
                            }
                        } else {
                            this.errors.push(INVALID_PHONE_NUMBER_MSG);
                        }
                    } else {
                        this.errors.push(INVALID_EMAIL_MSG);
                    }
                } else {
                    this.errors.push(INVALID_HOST_NAME_MSG);
                }
            } else {
                this.errors.push(REQUIRED_FIELDS_NOT_FILLED_MSG);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
