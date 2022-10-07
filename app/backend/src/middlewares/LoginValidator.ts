import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export default class LoginValidator {
  private _joi;

  constructor() {
    this._joi = Joi;
  }

  async validateBody(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const schema = this._joi.object({
      email: this._joi.string().required().email(),
      password: this._joi.string().required().min(6),
    }).messages({ 'string.empty': 'All fields must be filled' });

    await schema.validateAsync(req.body);

    next();
  }
}
