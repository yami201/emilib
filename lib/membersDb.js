import clientPromise from './dbConnect';
import {Status} from "@/lib/utils";
import {ObjectId} from "mongodb";

export async function createMember(data) {
    let member = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        joinDate: new Date().toLocaleDateString(),
        numberOfLoan: 0,
        statusLoan: Status.DONE
    }
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').insertOne(member);
}

export async function getMembers() {
    const client = await clientPromise;
    const db = client.db('library');
    return db.collection('members').find({}).toArray();
}

export async function findMembersByQuery(query) {
    const client = await clientPromise;
    if (query.hasOwnProperty('_id')) {
        let id = query._id;
        query._id = new ObjectId(id);
    }
    const db = client.db('library');
    return db.collection("members").find(query).toArray();
}

export async function updateMember(query, update) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').updateOne(query, {$set: update});
}

export async function incrementLoan(query, update) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').updateOne(query, update);
}