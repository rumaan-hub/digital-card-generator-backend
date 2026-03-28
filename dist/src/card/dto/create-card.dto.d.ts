declare class SocialLinkDto {
    platform: string;
    url: string;
}
declare class CustomButtonDto {
    label: string;
    url: string;
}
export declare class CreateCardDto {
    slug?: string;
    name: string;
    profileImage?: string;
    coverImage?: string;
    jobTitle?: string;
    company?: string;
    bio?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    website?: string;
    address?: string;
    theme?: Record<string, any>;
    socialLinks?: SocialLinkDto[];
    customButtons?: CustomButtonDto[];
}
export {};
