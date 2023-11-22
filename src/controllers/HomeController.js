import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      name: 'Afonso',
      last_name: 'Luis',
      email: 'afonsoluis@gmail.com',
      age: 4,
      weight: 9,
      height: 0.8,
    });
    res.json(newStudent);
  }
}

export default new HomeController();
