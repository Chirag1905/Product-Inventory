"use client";

type TableSkeletonProps = {
    rows?: number;
};

const TableSkeleton: React.FC<TableSkeletonProps> = ({
    rows = 5,
}) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                    {/* SR No */}
                    <td className="border-r border-gray-100 px-6 py-4">
                        <div className="h-4 w-10 rounded bg-gray-200" />
                    </td>

                    {/* Name */}
                    <td className="border-r border-gray-100 px-6 py-4">
                        <div className="h-4 w-40 rounded bg-gray-200" />
                    </td>

                    {/* Categories */}
                    <td className="border-r border-gray-100 px-6 py-4">
                        <div className="flex gap-2">
                            <div className="h-5 w-16 rounded-full bg-gray-200" />
                            <div className="h-5 w-20 rounded-full bg-gray-200" />
                        </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                        <div className="ml-auto h-8 w-8 rounded bg-gray-200" />
                    </td>
                </tr>
            ))}
        </>
    );
};

export default TableSkeleton;
