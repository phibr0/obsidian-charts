export interface ChartPluginSettings {
    colors: string[];
    contextMenu: boolean;
    imageSettings: ImageOptions;
}

export const DEFAULT_SETTINGS: ChartPluginSettings = {
    colors: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ],
    contextMenu: true,
    imageSettings: {
        format: 'image/png',
        quality: 0.92,
    }
}

export interface ImageOptions {
    format: 'image/jpeg' | 'image/png' | 'image/webp';
    quality: number;
}

export interface DataField {
    dataTitle: string;
    data: string;
}
