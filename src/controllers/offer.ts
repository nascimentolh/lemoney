import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller("offer")
export class OfferController {
  @Get()
  public getOffers(_: Request, res: Response): void {
    res.send([
      {
        id: "da1id1289dakjd12asldasd1sa",
        advertiser_name: "Jhon Execute",
        url: "http://jhonexecute.tt",
        starts_at: "2021-01-01 00:00:00",
        ends_at: "2021-02-02 00:00:00",
        premium: false,
      },
      {
        id: "da1id1289dakjd12aasdasassa",
        advertiser_name: "Jhon Doe",
        url: "http://jhondoe.tt",
        starts_at: "2021-01-01 00:00:00",
        premium: true,
      },
    ]);
  }
}
