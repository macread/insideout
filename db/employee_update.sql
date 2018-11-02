UPDATE employees
SET firstname = $1, lastname = $2, email = $3, phone = $4, salary = $5
WHERE id = $6