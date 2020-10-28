import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const checkTransaction = await transactionRepository.findOne(id);

    if (!checkTransaction) {
      throw new AppError('Transation not found');
    }
    await transactionRepository.remove(checkTransaction);
  }
}

export default DeleteTransactionService;
