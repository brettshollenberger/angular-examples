angular
  .module('app')
  .factory('users', function() {
    return [
      {
        name: 'Yehuda Katz',
        email: 'katz@gotyourtongue.com',
        spent: '18.99',
        joined: new Date('January 1, 2014')
      },
      {
        name: 'DHH',
        email: 'dhh@rails.net',
        spent: '0.00',
        joined: new Date('June 15, 2013')
      },
      {
        name: 'Avdi Grimm',
        email: 'avdi@gmail.com',
        spent: '10.99',
        joined: new Date('March 17, 2012')
      },
      {
        name: 'Ryan Bates',
        email: 'ryan@railscasts.com',
        spent: '200.00',
        joined: new Date('December 10, 2011')
      },
      {
        name: 'Sandi Metz',
        email: 'sandi@poodr.com',
        spent: '18.99',
        joined: new Date('May 11, 2010')
      }
    ];
  });
