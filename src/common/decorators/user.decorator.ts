import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;  // Access the `user` property set by the JwtStrategy
    },
  );