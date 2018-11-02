module.exports = {
    //Employee Callbacks

    addEmployee: (req, res, next) => {
        const connection = req.app.get('db');
        const { firstName, lastName, email, phone, salary } = req.body;
        connection.employee_add([firstName, lastName, email, phone, salary])
            .then ( (employees) => {
                res.status(200).send(employees)} )
            .catch ( (err) => res.status(500).send())
    },

    deleteEmployee: (req, res, next) => {
        const connection = req.app.get('db');
        connection.employee_delete([req.params.id])
            .then ( (employee) => {
                res.status(200).send(employee)} )
            .catch ( (err) => res.status(500).send())
    },
    
    getEmployee: (req, res, next) => {
        const connection = req.app.get('db');
        connection.employee_get([req.params.id])
            .then ( (employees) => {
                res.status(200).send(employees)} )
            .catch ( (err) => res.status(500).send())
    },

    getEmployees: (req, res, next) => {
        const connection = req.app.get('db');
        connection.employees_get()
            .then ( (employees) => {
                res.status(200).send(employees)} )
            .catch ( (err) => res.status(500).send())
    },

    updateEmployee: (req, res, next) => {
        const connection = req.app.get('db');
        const { id, firstName, lastName, email, phone, salary } = req.body;
        connection.employee_update([firstName, lastName, email, phone, salary, id])
            .then ( (employees) => {
                res.status(200).send(employees)} )
            .catch ( (err) => res.status(500).send())
    },

}