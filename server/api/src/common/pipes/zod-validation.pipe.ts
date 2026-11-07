import { BadRequestException, type PipeTransform } from '@nestjs/common';
import { type ZodType } from 'zod';

/**
 * Valida parâmetros/corpo com um schema Zod de @pilaris/shared.
 * Uso: `@Body(new ZodValidationPipe(createStudentSchema)) body: CreateStudentInput`
 */
export class ZodValidationPipe<TOutput> implements PipeTransform<unknown, TOutput> {
  constructor(private readonly schema: ZodType<TOutput>) {}

  transform(value: unknown): TOutput {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(
        result.error.issues.map((issue) =>
          issue.path.length ? `${issue.path.join('.')}: ${issue.message}` : issue.message,
        ),
      );
    }
    return result.data;
  }
}
