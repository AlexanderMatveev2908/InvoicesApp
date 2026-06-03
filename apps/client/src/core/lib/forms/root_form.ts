import { FormGroup } from '@angular/forms';
import z from 'zod';

export class LibRootForm {
  public static setupIssues<T>({
    data,
    schema,
    form,
  }: {
    data: T;
    schema: z.ZodType<T>;
    form: FormGroup;
  }): void {
    const res = schema.safeParse(data);

    for (const ctrl of Object.values(form.controls)) {
      ctrl.setErrors(null);
    }

    if (!res.success) {
      for (const issue of res.error.issues) {
        const ctrl = form.get(issue.path.join('.'));

        ctrl?.setErrors({
          zod: issue.message,
        });

        ctrl?.markAsDirty();
        ctrl?.markAsTouched();
      }

      return;
    }

    for (const ctrl of Object.values(form.controls)) {
      ctrl.setErrors(null);
    }
  }
}
