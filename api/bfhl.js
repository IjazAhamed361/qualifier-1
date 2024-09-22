// api/bfhl.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { data, file_b64 } = req.body;

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const highestLowercase = alphabets.filter(char => char === char.toLowerCase());
        const highest_lowercase_alphabet = highestLowercase.length > 0 ? [highestLowercase[highestLowercase.length - 1]] : [];

        let file_valid = false;
        let file_mime_type = '';
        let file_size_kb = 0;

        if (file_b64) {
            const base64Data = file_b64.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            file_size_kb = buffer.length / 1024;
            file_valid = true;
            file_mime_type = 'application/octet-stream'; // Adjust based on file type
        }

        res.status(200).json({
            is_success: true,
            user_id: 'john_doe_17091999',
            email: 'john@xyz.com',
            roll_number: 'ABCD123',
            numbers,
            alphabets,
            highest_lowercase_alphabet,
            file_valid,
            file_mime_type,
            file_size_kb: file_size_kb.toFixed(2),
        });
    } else if (req.method === 'GET') {
        res.status(200).json({ operation_code: 1 });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
