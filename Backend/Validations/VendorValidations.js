import validator from 'validator';

const REQUIRED_FIELDS_NOT_FILLED_MSG = 'Required fields are not filled';
const INVALID_HOST_NAME_MSG = 'VendorName contains invalid characters';
const INVALID_EMAIL_MSG = 'Email Id not valid';
const INVALID_PHONE_NUMBER_MSG = 'Phone Number is not valid';

export default class Validation {
    valid = false;
    errors = [];

    constructor(document, TicketCount) {
        try {
            if (
                document.VendorName !== '' &&
                document.VendorEmail !== '' &&
                document.VendorPhone !== '' &&
                document.StartDate !== '' &&
                document.EndDate !== '' &&
                TicketCount > 0
            ) {
                if (validator.isAlpha(document.VendorName)) {
                    if (validator.isEmail(document.VendorEmail)) {
                        const phoneRegex = /^[6-9]\d{9}$/gi;
                        if (phoneRegex.test(document.VendorPhone)) {
                            this.valid = true;
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
