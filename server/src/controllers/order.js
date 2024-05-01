import express from 'express';
import Order from '../models/Order.js';

//post new product
export const postOrderDetails = async (req, res) => {
    console.log('postOrderDetails...')
    console.log('req.body', req.body)

    const {orderDetails} = req.body
    let messagePart1 = "Order Items";

    try{
        const newOrder = new Order(orderDetails)
        await newOrder.save();

        //send order details as text message
        orderDetails.order_items.forEach(orderItem => {
            messagePart1 = messagePart1 + '\n\n' + `*Title:* ${orderItem.title}, \n*Company:* ${orderItem.company}, \n*Package:* ${orderItem.package}, \n*Size:* ${orderItem.size}, \n*MRP*: ${orderItem.MRP}, \n*Discount:* ${orderItem.discountedPercentage}, \n*Quantity:* ${orderItem.quantity}`
        })
        let messagePart2 =  `*Shipping Address:* ${orderDetails.shipping_address}, \n*Order Total:* ${orderDetails.order_total}, \n*Order Instruction:* ${orderDetails.order_instruction}`
        const orderDetailsMessage = messagePart1 + '\n\n' + messagePart2
        console.log('orderDetailsMessage', orderDetailsMessage)

        res.status(201).json('order details inserted')
    }
    catch(error){
        console.log('error while inserting the order details')
        res.status(500).json({"message":error.message})
    }
}

// get all orders for order history
export const getAllOrders = async (req, res) => {
    console.log('getAllOrders...')
    try{
        const orderHistory = await Order.find({})
        console.log('orderHistory', orderHistory)
        res.status(200).json(orderHistory)
    }
    catch(error){
        console.log('Error getting order history')
        res.status(500).json({"message":error.message})
    }
}



