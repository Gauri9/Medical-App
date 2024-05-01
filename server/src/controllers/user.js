import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import User from '../models/User.js';
import config from '../config/dev.js';

const router = express.Router();

//post login creds 
export const postLoginCreds = async (req, res) => {
    console.log('inside postLoginCreds')
    try{
        const { username, password } = req.body;
        const address = req.body.address || []

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const creds = new User({username: username, password: hashedPassword, address: address })

        await creds.save();
        res.status(201).json('successfully user added!');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//authenticate 
// validate: username and pswd
export const validateCreds = async(req, res) => {
    console.log('inside validateCreds')
    const user = await User.findOne({ username: req.body.username });
    console.log('user', user)

    if(user == null){
        return res.status(400).send('Wrong Credentials')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            // Create a JWT and send it to the client
            const token = jwt.sign({user_id: user._id, username: user.username}, config.jwt.SECRET_KEY)
            console.log('token', token)
            res.status(200).json({token:token, message:'Success'})
        }
        else{
            res.status(400).send('Wrong Credentials')
        }
    }catch{
        res.status(500).send('Some error occured!!')
    }

}

//jwt-testing
export const authTest = async(req, res) => {
    console.log('inside authTest...');

    // Accessible only if authenticated
    console.log('req.username', req.username)
    const username = req.username
    res.json({ message: 'Protected route accessed', username});
};

// getCurrentUser
export const getCurrentUser = async(req, res) => {
    console.log('inside getCurrentUser...');
    console.log('req.user_id', req.user_id)
    res.json({username: req.username, user_id: req.user_id});
}

//GET addresses by username
export const getAddressesbyUser = async(req, res) => {
    console.log('inside getAddressesbyUser...');    

    console.log('req.username', req.username)
    const username = req.username

    console.log('username', username)

    const user = await User.findOne({ username: username});

    if(user == null){
        return res.status(400).send('Cannot find user')
    }
   
    const addresses = user.address;
    // console.log(addresses);

    res.status(200).json(addresses)
}

// post new address for existing user
export const postNewAddress = async(req, res) => {
    console.log('inside postNewAddress...');
    try {
        const {newAddress} = req.body;
        console.log('req.username', req.username)
        const username = req.username
        
        const user = await User.findOne({ username: username });
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        user.address.push(newAddress);
        await user.save();

        res.status(200).json({ message: 'Address added successfully!'});
    } 
    catch(error){
        console.error('Error adding address:', error);
        res.status(500).json({ message: 'Internal server error!' });
    }  
}

//remove nth-index address of a user from the address list
export const deleteAddress = async(req, res) => {
    console.log('deleteAddress...');
    try{
        const {username, index} = req.body;
        const user = await User.findOne({username: username});
        if (!user){
            return res.status(404).json({ message: 'User not found!' });
        }

        if(index >= user.address.length || index<0){
            return res.status(404).json({ message: 'Invalid index!' });
        }

        user.address.splice(index,1);
        user.save();

        res.status(200).json({message: 'Address deleted successfully!'})
    }
    catch(error){
        console.error('Error deleteing address:', error);
        res.status(500).json({ message: 'Internal server error!' });
    }
}


export default router;