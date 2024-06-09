import {name} from "next/dist/telemetry/ci-info";
import {hashPassword} from "@/lib/utils";


export class Member{
    constructor(name, phone, email, password) {
        this.joinDate = new Date().toLocaleDateString();
        this.numberOfLoan = 0;
        this.statusLoan = "No";
        this.name = name;
        this.email = email;
        this.password = password
        this.phone = phone;
    }
}


export class Loan{

}