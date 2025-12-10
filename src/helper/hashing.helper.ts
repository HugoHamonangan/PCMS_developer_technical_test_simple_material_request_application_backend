import * as bcrypt from 'bcrypt';

export const createHashing = async (data: string): Promise<string> => {
  const saltOrRounds = 11;
  const hash = await bcrypt.hash(data, saltOrRounds);

  return hash;
};
