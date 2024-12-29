import { ApiUnauthorizedResponse } from "@nestjs/swagger";

interface UnauthorizedResponseProps {
    controller?: string | null
}

export const CustomApiUnauthorizedResponse = () => ApiUnauthorizedResponse({ description: 'Unauthorized', example: { message: 'Unauthorized', statusCode: 401 } })