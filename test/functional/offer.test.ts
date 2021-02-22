describe('Offer Results Functional Test', () => {
  it('should return a offer', async () => {
    const { body, status } = await global.testRequest.get('/offer');
    expect(status).toBe(200);
    expect(body).toEqual([
      {
        id: 'da1id1289dakjd12asldasd1sa',
        advertiser_name: 'Jhon Execute',
        url: 'http://jhonexecute.tt',
        starts_at: '2021-01-01 00:00:00',
        ends_at: '2021-02-02 00:00:00',
        premium: false,
      },
      {
        id: 'da1id1289dakjd12aasdasassa',
        advertiser_name: 'Jhon Doe',
        url: 'http://jhondoe.tt',
        starts_at: '2021-01-01 00:00:00',
        premium: true,
      },
    ]);
  });
});
