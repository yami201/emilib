import clientPromise from '@/lib/mongo/dbConnect';
import {Status} from "@/lib/utils";
import {incrementLoan, updateMember} from "@/lib/mongo/db/members";
import {ObjectId} from "mongodb";
import { decrementQuantity } from './books';

export async function createLoan(data) {
    let loan = {
        memberId: data.member,
        bookId: data.book,
        startingDate: data.issueDate,
        endingDate: data.returnDate,
        statusLoan: Status.ACTIVE
    }
    console.log(data)
    await incrementLoan(data.member)
    await decrementQuantity(data.book)
    const client = await clientPromise;
    const db = client.db('emilib');
    return await db.collection('loans').insertOne(loan);
}

export async function getLoans() {
    const client = await clientPromise;
    const db = client.db('emilib');
    const loans = await db.collection('loans').find({}).toArray();
    const currentDate = new Date();
    for (const loan of loans) {
        const returningDate = new Date(loan.endingDate);

        const member = await db.collection('members').findOne(
            { _id: new ObjectId(loan.memberId) },
            { projection: { name: 1 } }
        );
        
        const book = await db.collection('books').findOne(
            { isbn: loan.bookId },
            { projection: { title: 1 } }
        );

        loan.member = member.name
        loan.book = book.title
        if (currentDate > returningDate) {
            loan.statusLoan = Status.OVERDUE;
            await updateLoan({_id: loan._id}, {statusLoan: Status.OVERDUE});
            await updateMember({_id: new ObjectId(loan.memberId)}, {statusLoan: Status.OVERDUE})
        }
    }

    return loans;
}

export async function findLoansByQuery(query) {
    const client = await clientPromise;
    const db = client.db('emilib');
    if (query.hasOwnProperty('_id')) {
        let id = query._id;
        query._id = new ObjectId(id);
    }
    let loans = await db.collection("loans").find(query).toArray();
    const currentDate = new Date();
    for (const loan of loans) {
        const returningDate = new Date(loan.endingDate);
        if (currentDate > returningDate) {
            loan.statusLoan = Status.OVERDUE;
            await updateLoan({_id: loan._id}, {statusLoan: Status.OVERDUE});
            await updateMember({_id: new ObjectId(loan.memberId)}, {statusLoan: Status.OVERDUE})
        }
    }

    return loans;
}

export async function updateLoan(query, update) {
    const client = await clientPromise;
    const db = client.db('emilib');
    return await db.collection('loans').updateOne(query, {$set: update});
}