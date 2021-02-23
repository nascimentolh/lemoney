describe('Offer Results Functional Test', () => {
  describe('When creating a new offer', () => {
    it('should succesfully create a new offer', async () => {
      const createOffer = {
        advertiser_name: 'John Doe',
        url: 'http://google.com.br',
        description: 'this a short description',
        starts_at: '2020-01-02T03:00:00.000Z',
      };

      const response = await global.testRequest
        .post('/offers')
        .send(createOffer);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          ...createOffer,
          ...{ premium: false, active: false },
        })
      );
    });

    it('should return 422 when there is a validation error, very long description', async () => {
      const createOffer = {
        advertiser_name: 'John Doe',
        url: 'http://google.com.br',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        starts_at: '2020-01-02T03:00:00.000Z',
      };

      const response = await global.testRequest
        .post('/offers')
        .send(createOffer);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error:
          'Offer validation failed: description: the maximum length is 500.',
      });
    });

    it('should return 422 when there is a validation error, invalid URI', async () => {
      const createOffer = {
        advertiser_name: 'John Doe',
        url: 'hjson:notvalid.tex',
        description: 'this a only description',
        starts_at: '2020-01-02T03:00:00.000Z',
      };

      const response = await global.testRequest
        .post('/offers')
        .send(createOffer);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error:
          'Offer validation failed: url: this is not a valid URI.',
      });
    });
  });
  it('should return a offer', async () => {
    const { body, status } = await global.testRequest.get('/offers');
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
