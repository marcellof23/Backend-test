const generatePassword = (length) => {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return password;
};

module.exports = generatePassword;
