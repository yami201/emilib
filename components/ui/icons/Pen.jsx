const Pen = ({color = "black"}) => {
    return (
        <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.37556 0.679352L5.52477 1.53013L7.80993 3.81529L8.66071 2.96451C9.10017 2.52505 9.10017 1.81314 8.66071 1.37369L7.96813 0.679352C7.52868 0.239899 6.81677 0.239899 6.37731 0.679352H6.37556ZM5.12751 1.9274L1.03005 6.02662C0.847235 6.20943 0.713642 6.43619 0.639813 6.68404L0.0175478 8.79869C-0.0263975 8.9481 0.0140322 9.10806 0.123017 9.21705C0.232001 9.32603 0.391962 9.36646 0.539618 9.32427L2.65427 8.70201C2.90212 8.62818 3.12888 8.49459 3.31169 8.31177L7.41267 4.21255L5.12751 1.9274Z" fill={color} />
        </svg>

    );
}

export default Pen;