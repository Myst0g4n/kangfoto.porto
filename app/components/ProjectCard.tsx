import { GalleryItem as ProjectImage } from '@/lib/utils/dataManager'; // Menggunakan GalleryItem karena struktur data telah berubah

interface ProjectCardProps {
    project: ProjectImage; // Menggunakan ProjectImage sebagai ganti Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const title = project.name || 'Project'; // Menggunakan property name sesuai dengan struktur data baru

    return (
        <div className="group relative overflow-hidden rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 aspect-square hover:scale-105 transition duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">{title}</span>
            </div>
        </div>
    );
}
