import { Request, Response } from "express";

class RefreshTokenController {
  handle(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}

export { RefreshTokenController };
