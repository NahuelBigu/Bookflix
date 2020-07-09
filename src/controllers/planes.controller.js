const Plan = require('../models/plan');
var fs = require('fs');

const planCtrl = {};

planCtrl.getPlanes = async(req, res) => {
    const planes = await Plan.find();
    res.json(planes);
}

planCtrl.getPlan = async(req, res) => {
    const { id } = req.params;
    const plan = await Plan.findOne({ "value": id });
    res.json(plan);
}



planCtrl.createPlan = async(req, res) => {
    if (!req.body.name) return res.status(401).send('Nombre requerido');
    if (!req.body.price) return res.status(401).send('Precio requerido');

    const newPlan = new Plan({
        name: req.body.name,
        price: req.body.price,
        cantProfile: req.body.cantProfile,
        value: req.body.value,
        active: true
    })
    await newPlan.save();
    res.json({
        'status': 'plan saved'
    })
}


planCtrl.editPlan = async(req, res) => {
    if (!req.body.name) return res.status(401).send('Nombre requerido');
    if (!req.body.price) return res.status(401).send('Precio requerido');


    const { id } = req.params;
    const plan = await Plan.findById(id);

    plan.name = req.body.name;
    plan.price = req.body.price;
    plan.cantProfile = req.body.cantProfile,
        plan.value = req.body.value,
        plan.save();

    res.json({ 'status': 'plan updeted' });
}

planCtrl.deletePlan = async(req, res) => {

    const plan = await Plan.findById(req.params.id);
    plan.active = false;
    plan.save();
    res.json({ 'status': 'plan deleted' });
}
planCtrl.habilitarPlan = async(req, res) => {

    const plan = await Plan.findById(req.params.id);
    plan.active = true;
    plan.save();
    res.json({ 'status': true });
}


module.exports = planCtrl;