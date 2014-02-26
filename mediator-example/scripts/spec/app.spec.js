describe('mediator', function() {

    var Order, Invoice, Mediator;

    beforeEach(module('mediator'))
    beforeEach(inject(function(_Order_, _Invoice_, _lsMediator_) {
        Order    = _Order_;
        Invoice  = _Invoice_;
        Mediator = _lsMediator_;
    }));

    it('works', function() {
        var order = new Order();
        expect(order.cool).toEqual('dog');
    });
})
