import { DownloadImageModal } from "#components";

export default function useImageModal() {
	// prepare image modal for viewing and downloading
	const overlay = useOverlay();
	const modal = overlay.create(DownloadImageModal);

	const openImageModal = async (path: string) => {
		modal.open({
			imgPath: path,
		});
	};

	return {
		openImageModal,
	};
}
