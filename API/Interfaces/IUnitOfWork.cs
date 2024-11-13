namespace API.Interfaces;

public interface IUnitOfWork {
    IVehicleRepository VehicleRepository { get; }
    IBrandRepository BrandRepository { get; }

    Task<bool> CompleteAsync();
    bool HasChanges();
}
