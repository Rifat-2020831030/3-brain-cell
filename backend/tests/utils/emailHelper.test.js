const nodemailer = require('nodemailer');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../../src/utils/emailHelper');
const config = require('../../src/config/env');

jest.mock('nodemailer');

describe('emailHelper', () => {
  let mockSendMail;

  beforeEach(() => {
    mockSendMail = jest.fn().mockResolvedValue({});
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('sendVerificationEmail', () => {
    it('should send a verification email successfully', async () => {
      const email = 'test@example.com';
      const code = '123456';

      await sendVerificationEmail(email, code);

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        service: 'gmail',
        secure: true,
        auth: {
          user: config.email.user,
          pass: config.email.mailpass,
        },
      });

      expect(mockSendMail).toHaveBeenCalledWith({
        from: config.email.user,
        to: email,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${code}`,
      });
    });

    it('should throw an error if sending the verification email fails', async () => {
      const email = 'test@example.com';
      const code = '123456';
      mockSendMail.mockRejectedValue(new Error('SMTP Error'));

      await expect(sendVerificationEmail(email, code)).rejects.toThrow('Failed to send verification email.');

      expect(mockSendMail).toHaveBeenCalled();
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send a password reset email successfully', async () => {
      const email = 'test@example.com';
      const resetCode = '654321';

      await sendPasswordResetEmail(email, resetCode);

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        service: 'gmail',
        secure: true,
        auth: {
          user: config.email.user,
          pass: config.email.mailpass,
        },
      });

      expect(mockSendMail).toHaveBeenCalledWith({
        from: config.email.user,
        to: email,
        subject: 'Password Reset Request',
        text: `Your password reset code is: ${resetCode}. This code is valid for 10 minutes.`,
      });
    });

    it('should throw an error if sending the password reset email fails', async () => {
      const email = 'test@example.com';
      const resetCode = '654321';
      mockSendMail.mockRejectedValue(new Error('SMTP Error'));

      await expect(sendPasswordResetEmail(email, resetCode)).rejects.toThrow('Failed to send password reset email.');

      expect(mockSendMail).toHaveBeenCalled();
    });
  });
});