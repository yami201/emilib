import clientPromise from './dbConnect';
import {Member} from "@/lib/definition";

export async function createMember(data) {
    let member = new Member(data.name, data.phone, data.email);
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
    const db = client.db('library');
    return db.collection("members").find(query).toArray();
}

export async function updateMember(query, update) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').updateOne(query, {$set: update});
}