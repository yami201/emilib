import {name} from "next/dist/telemetry/ci-info";


export class Member {
    _id;
    constructor(name, phone, email) {
        this.joinDate = new Date().toLocaleDateString();
        this.numberOfLoan = 0;
        this.statusLoan = Status.DONE;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}


export class Loan {

}


export const Status = {
    ACTIVE: 'active',
    DONE: 'done',
    OVERDUE: 'overdue',
};