export interface ValidationResult {
    valid: boolean;
    issuer: string | null;
    reason?: string;
}
export declare const validateCardNumber: (cardNumber: string) => ValidationResult;
//# sourceMappingURL=card.service.d.ts.map