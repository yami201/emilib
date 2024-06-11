import clientPromise from './dbConnect';
import {Status} from "@/lib/utils";
import {incrementLoan, updateMember} from "@/lib/membersDb";
import {ObjectId} from "mongodb";

export async function createLoan(data) {
    let start = new Date();
    let returning = new Date()
    returning.setDate(start.getDate() + 7)
    let loan = {
        memberId: data.memberId,
        bookId: data.bookId,
        startingDate: start.toLocaleDateString(),
        returningDate: returning.toLocaleDateString(),
        statusLoan: Status.ACTIVE
    }
    await updateMember({_id: new ObjectId(data.memberId)}, {statusLoan: Status.ACTIVE})
    await incrementLoan({_id: new ObjectId(data.memberId)}, {$inc: {numberOfLoan: 1}})
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('loans').insertOne(loan);
}

export async function getLoans() {
    const client = await clientPromise;
    const db = client.db('library');
    let loans = await db.collection('loans').find({}).toArray();
    const currentDate = new Date();
    for (const loan of loans) {
        const returningDate = new Date(loan.returningDate);
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
    const db = client.db('library');
    if (query.hasOwnProperty('_id')) {
        let id = query._id;
        query._id = new ObjectId(id);
    }
    let loans = await db.collection("loans").find(query).toArray();
    const currentDate = new Date();
    for (const loan of loans) {
        const returningDate = new Date(loan.returningDate);
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
    const db = client.db('library');
    return await db.collection('loans').updateOne(query, {$set: update});
}