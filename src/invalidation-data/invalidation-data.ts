/**
 * Class InvalidationData
 */
abstract class InvalidationData
{
    constructor(private verificationId: string) {
    }

    /**
     * @return {string}
     */
    public abstract getMethodType(): string;

    /**
     * @return {string}
     */
    public getVerificationId(): string
    {
        return this.verificationId;
    }
}
