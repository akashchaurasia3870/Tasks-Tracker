function generateUniqueId() {
    const now = new Date();
    const timestamp = now.getTime().toString(36); // Base36 encoding of timestamp
    const milliseconds = now.getMilliseconds().toString(36); // Base36 encoding of milliseconds
    const randomPart = Math.random().toString(36).substring(2, 10); // Random string
    return `${timestamp}-${milliseconds}-${randomPart}`;
}

export default generateUniqueId ;
