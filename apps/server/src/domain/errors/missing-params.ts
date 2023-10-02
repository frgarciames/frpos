export const MissingParamsError = (params: Record<string, any>) => {
  const undefinedParams = Object.entries(params).filter(
    ([_, value]) => value === undefined || value === null
  );
  return new Error(
    `Missing params: ${undefinedParams.map(([key]) => key).join(", ")}`
  );
};
