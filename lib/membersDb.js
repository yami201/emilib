import clientPromise from './dbConnect';
import {Member} from "@/lib/definition";
import {hashPassword} from "@/lib/utils";

export async function createMember(data) {
    const password = await hashPassword(data.password);
    let member = new Member(data.name, data.phone, data.email, password);

    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').insertOne(member);
}

export async function getMembers() {
    const client = await clientPromise;
    const db = client.db('library');
    return db.collection('members').find({}, {projection: {password: 0}}).toArray();
}

export async function findByName(name) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').findOne({name: name}, {projection: {password: 0}});
}

export async function findByEmail(email) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').findOne({email: email}, {projection: {password: 0}});
}

export async function findByJoinDate(joinDate) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').findOne({joinDate: joinDate}, {projection: {password: 0}});
}

export async function findByNumberOfLoan(numberOfLoan) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').find({numberOfLoan: numberOfLoan}, {projection: {password: 0}}).toArray();
}

export async function findByStatusLoan(status) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').find({status: status}, {projection: {password: 0}}).toArray();

}

export async function updateMember(query, update) {
    const client = await clientPromise;
    const db = client.db('library');
    return await db.collection('members').updateOne(query, {$set: update});
}