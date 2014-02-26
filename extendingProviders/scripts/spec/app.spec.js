describe('extending a provider', function() {

    var facultyRoute;

    beforeEach(module('FacultyDispatch'));
    beforeEach(module('FacultyDispatch.Routing'));

    beforeEach(inject(function(_facultyRoute_) {
        facultyRoute = _facultyRoute_;
    }));

    it('loads the provider', function() {
        expect(facultyRoute).toEqual({a: 'b'});
    });
});
