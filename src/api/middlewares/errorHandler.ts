import { isCelebrateError } from "celebrate";
import { ErrorResponse } from "../../utils";

export default (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  const InvalidError = (FieldName: string, message: string) => {
    error = new ErrorResponse(message, 400, `API.Invalid.${FieldName}`);
  };

  const RequiredError = (FieldName: string, message: string) => {
    error = new ErrorResponse(message, 400, `API.Required.${FieldName}`);
  };

  const UnauthorizedError = () => {
    error = new ErrorResponse("Unauthorized", 401, "API.Unauthorized.Account");
  };

  const NotPermittedError = (message: string) => {
    error = new ErrorResponse(message, 403, "API.NotPremited.Account");
  };

  const NotFoundError = (resource = "Resource", message: string) => {
    error = new ErrorResponse(message, 404, `API.NotFound.${resource}`);
  };

  const ConflictError = (conflictCase: string, message: string) => {
    error = new ErrorResponse(message, 409, `API.Conflict.${conflictCase}`);
  };

  const ServerError = (message: string) => {
    error = new ErrorResponse(message, 500, "API.TechnicalIssue.Server");
  };

  if (isCelebrateError(err)) {
    err.details.forEach(m => {
      if (typeof m == "object") {
        console.log("celebrate errooooooorrrrr==============>>>>>", m.details[0]);
        if (m.details[0].type.includes("base")) {
          InvalidError(m.details[0].context.key, "field invalid");
        } else if (m.details[0].type.includes("required")) {
          RequiredError(m.details[0].context.key, "field required");
        } else if (m.details[0].type === "string.empty") {
          RequiredError(m.details[0].context.key, "field required");
        } else if (m.details[0].type === "any.only") {
          InvalidError(m.details[0].context.key, `Valid options are ${m.details[0].context.valids.join(", ")}.`);
        } else if (m.details[0].type === "object.unknown") {
          InvalidError(m.details[0].context.key, "field invalid");
        } else if (m.details[0].type === "any.invalid") {
          InvalidError(m.details[0].context.key, "forbidden value entered");
        }
      }
    });
  }

  console.log("stack", err.stack);
  console.log("cs_Error", error);
  console.log("cs_Errorssss", error._message);

  res.status(error.statusCode || 500).json({
    error_code: error.errorCode || "API.TechnicalIssue.Server",
    error_description: error.errorCode ? error.message : "unknown server error"
  });
};
