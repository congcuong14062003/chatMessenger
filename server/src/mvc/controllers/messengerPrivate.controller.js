import PrivateMessage from "../models/messengerPrivate.model";
const sendPrivateMessage = async (req, res) => {
    try {console.log("req.body: ", req.body); 

        const { message_text, user_id } = req.body;
        const receiver_id = req.params.receiver_id;

        if (!message_text || !user_id || !receiver_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newMessage = await PrivateMessage.createNewMessage({
            sender_id: user_id,
            receiver_id: receiver_id,
            message_text: message_text
        });

        res.status(201).json({ message: 'Private message sent successfully', data: newMessage });
    } catch (error) {
        console.error('Error sending private message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { sendPrivateMessage };
