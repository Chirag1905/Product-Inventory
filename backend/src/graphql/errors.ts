import { GraphQLError } from "graphql";

export function apiError(
    message: string,
    code:
        | "BAD_USER_INPUT"
        | "NOT_FOUND"
        | "CONFLICT"
        | "INTERNAL_SERVER_ERROR" = "INTERNAL_SERVER_ERROR",
    details?: any
) {
    throw new GraphQLError(message, {
        extensions: {
            code,
            details,
        },
    });
}