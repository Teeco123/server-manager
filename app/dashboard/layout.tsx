import Navbar from "../components/navbar/navbar";
import "./layout.scss";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='main'>
			<div className='columns'>
				<Navbar />
				{children}
			</div>
		</div>
	);
}
