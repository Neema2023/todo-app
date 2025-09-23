const bcrypt = require('bcryptjs');

describe('Password hashing', () => {
  it('should hash the password correctly', async () => {
    const password = 'test1234';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const isMatch = await bcrypt.compare(password, hash);
    expect(isMatch).toBe(true);
  });
});
