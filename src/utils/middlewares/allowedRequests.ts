import express from "express"

const allowedMethods = (
    req: express.Request, 
    res: express.Response, 
    next: express.NextFunction
) => {
    // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
    const allowedMethods = [
      "OPTIONS",
      "HEAD",
      "CONNECT",
      "GET",
      "POST",
      "PUT",
      "DELETE"
    //   ,"PATCH",
    ];
  
    if (!allowedMethods.includes(req.method)) {
      res.status(405).send(`${req.method} not allowed.`);
    }
  
    next();
};

export default allowedMethods;
