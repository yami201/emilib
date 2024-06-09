// pages/api/member.js

import {getMembers, createMember, findByEmail, findByName, findByNumberOfLoan, findByStatusLoan} from '@/lib/membersDb'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const {name, email, numberOfLoan, statusLoan} = req.query;
        if (name) {
            const member = await findByName(name);
            res.status(200).json(member);
        } else if (email) {
            const member = await findByEmail(email);
            res.status(200).json(member);
        } else if (numberOfLoan) {
            const member = await findByNumberOfLoan(parseInt(numberOfLoan));
            res.status(200).json(member);
        } else if (statusLoan){
            const member = await findByStatusLoan(statusLoan);
            res.status(200).json(member);
        } else {
            const members = await getMembers();
            res.status(200).json(members);
        }
    } else if (req.method === 'POST') {
        createMember(req.body).then(r => console.log(r))
        res.status(200).json({message: 'Member created'})
    } else {
        if (req.method === 'PUT') {

        } else {
            res.status(405).json({message: 'Method not allowed'})
        }
    }


}